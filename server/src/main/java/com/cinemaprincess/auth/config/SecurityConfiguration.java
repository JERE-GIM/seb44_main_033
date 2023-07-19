package com.cinemaprincess.auth.config;

import com.cinemaprincess.auth.filter.JwtAuthenticationFilter;
import com.cinemaprincess.auth.filter.JwtVerificationFilter;
import com.cinemaprincess.auth.handler.OAuth2AuthenticationSuccessHandler;
import com.cinemaprincess.auth.handler.UserAuthenticationSuccessHandler;
import com.cinemaprincess.auth.handler.UserAuthenticationFailureHandler;
import com.cinemaprincess.auth.handler.UserAccessDeniedHandler;
import com.cinemaprincess.auth.handler.UserAuthenticationEntryPoint;
import com.cinemaprincess.auth.userdetails.OAuth2UserDetailsService;
import com.cinemaprincess.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.cinemaprincess.auth.jwt.JwtTokenProvider;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final OAuth2UserDetailsService oAuth2UserDetailsService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .csrf().disable()

                // 예외 핸들러 등록
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()

                // JWT 인증 및 검증 필터 등록
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        // 요청 접근 권한
                                .antMatchers("/", "/login/", "/login/**", "/signup", "/oauth2/**").permitAll()
                                .antMatchers(HttpMethod.GET, "/movies/**").permitAll()
                                .antMatchers(HttpMethod.GET, "/reviews/*").permitAll()
                                .antMatchers(HttpMethod.GET, "/search", "/search/**").permitAll()
                                .anyRequest().authenticated()
                )

                .oauth2Login()
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .userInfoEndpoint()
                .userService(oAuth2UserDetailsService);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://cinema-princess-s3-bucket.s3-website.ap-northeast-2.amazonaws.com/"));
        configuration.setAllowedOrigins(List.of("http://localhost:3000/"));
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("Authorization");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenProvider, customAuthorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}