package dev.codesquad.java.signup12;

public class ValidationResult {
    private boolean validation;

    public ValidationResult(boolean validation) {
        this.validation = validation;
    }

    public static ValidationResult ok() {
        return new ValidationResult(true);
    }

    public static ValidationResult failure() {
        return new ValidationResult(false);
    }

    public boolean isValidation() {
        return validation;
    }

    @Override
    public String toString() {
        return "ValidationResult{" +
                "validation=" + validation +
                '}';
    }
}
