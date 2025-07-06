package com.jgmartos.backend;

import java.util.List;
import java.util.ArrayList;

public class FormatterTestLongLines {

    public void testMethodWithVeryLongParameterNamesAndReturnTypes(
            String veryLongParameterName,
            Integer anotherVeryLongParameterName,
            Boolean yetAnotherLongParameterName) {
        System.out
                .println(
                        "This is a very long line that should definitely be wrapped at 10 characters if the formatter is working correctly");

        String veryLongVariableName = "This is a very long string that should be wrapped";
        Integer anotherVeryLongVariableName = 12345;

        if (veryLongParameterName != null
                && anotherVeryLongParameterName != null
                && yetAnotherLongParameterName != null) {
            System.out
                    .println(
                            "All parameters are not null: "
                                    + veryLongParameterName
                                    + ", "
                                    + anotherVeryLongParameterName
                                    + ", "
                                    + yetAnotherLongParameterName);
        }

        List<String> veryLongListVariableName = new ArrayList<>();
        veryLongListVariableName
                .add("first very long string item");
        veryLongListVariableName
                .add("second very long string item");
        veryLongListVariableName
                .add("third very long string item");
    }

    public String getVeryLongMethodNameThatShouldDefinitelyBeWrapped() {
        return "This return statement has a very long string that should be wrapped at 10 characters";
    }
}
