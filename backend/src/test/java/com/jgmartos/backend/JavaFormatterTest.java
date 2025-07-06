package com.jgmartos.backend;

import java.util.List;
import java.util.ArrayList;

public class JavaFormatterTest {
    private String name;
    private Integer id;

    public JavaFormatterTest(
            String name,
            Integer id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(
            String name) {
        this.name = name;
    }

    public void testBadFormatting() {
        if (name != null) {
            System.out
                    .println(
                            "Name is: "
                                    + name);
        } else {
            System.out
                    .println(
                            "Name is null");
        }

        for (int i = 0; i < 10; i++) {
            System.out
                    .println(
                            "Counter: "
                                    + i);
        }

        try {
            Thread.sleep(
                    1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        List<String> items = new ArrayList<>();
        items.add(
                "item1");
        items.add(
                "item2");
        items.stream()
                .filter(item -> item
                        .startsWith(
                                "item"))
                .forEach(
                        System.out::println);
    }
}
