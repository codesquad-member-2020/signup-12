package dev.codesquad.java.signup12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class UserController {
    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserRepository userRepository;

    @GetMapping("/")
    public String viewWelcomePage() {
        return "/index";
    }

    @GetMapping("/form")
    public String viewUserForm() {
        return "/join";
    }

    @PostMapping("/create")
    public String create(User user, Model model, String userId) {
        userRepository.save(user);
        return "redirect:/";
    }

    @GetMapping("/login")
    public String viewLoginForm() {
        return "/login";
    }
}
