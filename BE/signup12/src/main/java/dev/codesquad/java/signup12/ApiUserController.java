package dev.codesquad.java.signup12;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiUserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/test")
    public User test() {
        Long id = 1L;
        return userRepository.findById(id).orElseThrow(() -> new IllegalStateException("NO DATA"));
    }

    @PostMapping("/validate/{userId}")
    public boolean isValidUserId(@PathVariable String userId) {
        if (userRepository.findByUserId(userId) == null) {
            return true;
        }
        return false;
    }

    @PostMapping("/validate/{email}")
    public boolean isValidEmail(@PathVariable String email) {
        if (userRepository.findByEmail(email) == null) {
            return true;
        }
        return false;
    }

    @PostMapping("/validate/{phone}")
    public boolean isValidPhone(@PathVariable String phone) {
        if (userRepository.findByPhone(phone) == null) {
            return true;
        }
        return false;
    }
}
