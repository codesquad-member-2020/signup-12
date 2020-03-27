package dev.codesquad.java.signup12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;

@Controller
public class UserController {
    public static final String USER_SESSION_KEY = "sessionUser";
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

    @PostMapping("/login")
    public String login(String userId, String password, HttpSession session) {
        final String ERROR_MESSAGE_USERID = "회원 아이디를 찾을 수 없습니다.";
        final String ERROR_MESSAGE_PASSWORD = "비밀번호가 일치하지 않습니다.";

        User user = userRepository.findUserByUserId(userId).orElseThrow(() -> new NotFoundUserException(ERROR_MESSAGE_USERID));
        if (!user.isPasswordEquals(password)) {
            throw new WrongPasswordException(ERROR_MESSAGE_PASSWORD);
        }
        session.setAttribute(USER_SESSION_KEY, user);
        return "redirect:/";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute(USER_SESSION_KEY);
        return "redirect:/";
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private String catchNotFoundUserException(NotFoundUserException e, Model model) {
        model.addAttribute("errorMessage", e.getMessage());
        return "/login";
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    private String catchWrongPasswordException(WrongPasswordException e, Model model) {
        model.addAttribute("errorMessage", e.getMessage());
        return "/login";
    }
}
