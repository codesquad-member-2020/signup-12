package dev.codesquad.java.signup12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ApiUserController {
    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserRepository userRepository;

    @PostMapping("/validate/userId")
    public ValidationResult isValidUserId(@RequestBody String userId) {
        if (userRepository.findByUserId(userId) == null) {
            return ValidationResult.ok();
        }
        return ValidationResult.failure();
    }

    @PostMapping("/validate/email")
    public ValidationResult isValidEmail(@RequestBody String email) {
        if (userRepository.findByEmail(email) == null) {
            return ValidationResult.ok();
        }
        return ValidationResult.failure();
    }

    @PostMapping("/validate/phone")
    public ValidationResult isValidPhone(@RequestBody String phone) {
        if (userRepository.findByPhone(phone) == null) {
            return ValidationResult.ok();
        }
        return ValidationResult.failure();
    }
}
