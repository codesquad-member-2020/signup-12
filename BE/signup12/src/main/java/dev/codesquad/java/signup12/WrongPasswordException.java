package dev.codesquad.java.signup12;

public class WrongPasswordException extends RuntimeException{
    private final int ERROR_CODE;

    public WrongPasswordException(String message, int errorCode) {
        super(message);
        this.ERROR_CODE = errorCode;
    }

    public WrongPasswordException(String message) {
        this(message, 403);
    }
}
