package dev.codesquad.java.signup12;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/form")
    public String viewUserForm() {
        return "/form";
    }

    @PostMapping("/create")
    public String create(Model model, User user) {;
        model.addAttribute("user", user);
        userRepository.save(user);
        return "/result";
    }
}
