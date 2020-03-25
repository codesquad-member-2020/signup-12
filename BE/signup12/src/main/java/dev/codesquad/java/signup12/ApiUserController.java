package dev.codesquad.java.signup12;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
}
