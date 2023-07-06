package com.cinemaprincess.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Slf4j
@Aspect
@Component
public class LogAop {

    // com.cinemaprincess.statistics.controller 이하 패키지의 모든 클래스안의 모든 메서드에 적용
    @Pointcut("execution(* com.cinemaprincess.statistics.controller..*.*(..)) || execution(* com.cinemaprincess.search.controller..*.*(..))")
    private void cut(){}



    // pointcut에 의해 필터링된 경로로 들어오는 경우 메서드 호출전에 적용

    @Before("cut()")
    public void beforeParameterLog(JoinPoint joinPoint){
        Method method = getMethod(joinPoint);
        log.info("========method name = {} ===========", method.getName());

        Object[] args = joinPoint.getArgs();

        for (Object arg : args) {
            log.info("param type: {}", arg.getClass().getSimpleName());
            log.info("param value: {}", arg);
        }
    }

    //pointcut에 의해 필터링된 경로로 들어오는 경우 메서드 리턴후에 적용
    @AfterReturning(value = "cut()", returning = "returnObj")
    public void afterReturnLog(JoinPoint joinPoint, Object returnObj){
        Method method = getMethod(joinPoint);
        log.info("========method name = {} ===========", method.getName());

        log.info("return type = {}", returnObj.getClass().getSimpleName());
        log.info("return value = {}", returnObj);
    }

    private Method getMethod(JoinPoint joinPoint){
        MethodSignature signature = (MethodSignature)joinPoint.getSignature();
        return signature.getMethod();
    }


}
