package com.ss2fit.ss2backend.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormat {
    private static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public static Date parse(String date) throws ParseException {
        return formatter.parse(date);
    }
}
