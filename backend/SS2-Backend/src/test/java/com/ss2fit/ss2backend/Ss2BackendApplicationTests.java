package com.ss2fit.ss2backend;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class Ss2BackendApplicationTests {

    @Test
    void contextLoads() {
        String generatedString = RandomStringUtils.randomAlphanumeric(10);

        System.out.println(generatedString);
    }

}
