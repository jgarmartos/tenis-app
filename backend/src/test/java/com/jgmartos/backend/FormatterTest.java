package com.jgmartos.backend;

import java.util.List;
import java.util.ArrayList;

/**
 * Test
 * class
 * to
 * verify
 * Java
 * formatter
 * configuration
 */
public class FormatterTest {

    public class TestService {
        private String name;
        private Integer id;

        public TestService(
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

        public List<String> getList() {
            List<String> list = new ArrayList<>();
            list.add(
                    "test");
            list.add(
                    "format");
            return list;
        }

        public void testMethod() {
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
        }
    }
}
