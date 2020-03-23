package dev.codesquad.java.signup12;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/")
    public String test() {
        return "goood";
    }
}
