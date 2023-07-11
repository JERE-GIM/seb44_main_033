package com.cinemaprincess.auth.config;

import com.cinemaprincess.auth.filter.JwtAuthenticationFilter;
import com.cinemaprincess.auth.filter.JwtVerificationFilter;
import com.cinemaprincess.auth.handler.*;
import com.cinemaprincess.auth.userdetails.OAuth2UserDetailsService;
import com.cinemaprincess.auth.utils.CustomAuthorityUtils;
import com.cinemaprincess.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.cinemaprincess.auth.jwt.JwtTokenProvider;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

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
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()

                // 예외 핸들러 등록
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()

                // JWT 인증 및 검증 필터 등록
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        // 접근 권한 수정 필요
                        .anyRequest().permitAll()
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
        configuration.setAllowedOrigins(List.of("http://localhost:8080"));
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
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