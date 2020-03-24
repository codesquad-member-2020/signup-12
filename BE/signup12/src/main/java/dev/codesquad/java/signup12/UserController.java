package dev.codesquad.java.signup12;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/test")
    public String viewUserForm() {
        return "/form";
    }
}
