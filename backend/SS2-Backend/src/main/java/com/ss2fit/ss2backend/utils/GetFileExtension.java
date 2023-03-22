package com.ss2fit.ss2backend.utils;

public class GetFileExtension {
    public static String get(String fileName) {
        return  fileName.
                substring(fileName.lastIndexOf(".") + 1);
    }
}
