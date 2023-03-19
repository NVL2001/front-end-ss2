package com.ss2fit.ss2backend.utils;

import org.apache.commons.lang3.RandomStringUtils;

public class GenerateRandomString {
    public static String generate() {
        return RandomStringUtils.randomAlphanumeric(10);
    }
}
