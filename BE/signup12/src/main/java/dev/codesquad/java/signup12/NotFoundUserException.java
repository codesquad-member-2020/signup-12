package dev.codesquad.java.signup12;

public class NotFoundUserException extends RuntimeException {
    private final int ERROR_CODE;

    public NotFoundUserException(String message, int errorCode) {
        super(message);
        this.ERROR_CODE = errorCode;
    }

    public NotFoundUserException(String message) {
        this(message, 404);
    }
}
