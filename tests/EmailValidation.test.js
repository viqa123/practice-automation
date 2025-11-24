package Pasport;

import com.microsoft.playwright.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.*;

public class EmailValidationTest {
    private static Playwright playwright;
    private static Browser browser;
    private BrowserContext context;
    private Page page;

    @BeforeAll
    static void setUpAll() {
        playwright = Playwright.create();
        browser = playwright.firefox().launch(new BrowserType.LaunchOptions().setHeadless(false));
    }

    @BeforeEach
    void setUp() {
        context = browser.newContext();
        page = context.newPage();
        page.navigate("https://pasport.me/");
        Locator restoreAccess = page.locator("text=Restore access");
        restoreAccess.click();
    }

    @AfterAll
    static void tearDownAll() {
        browser.close();
        playwright.close();
    }

    @AfterEach
    void tearDown() {
        page.close();
        context.close();
    }

    private void checkEmailValidation(String emailValue) {
        Locator email = page.locator("input[type='email']");
        email.fill(emailValue);

        page.locator("text=Recovery account").click();
        page.waitForTimeout(500);

        String validationMessage = (String) email.evaluate("el => el.validationMessage");
        System.out.println("Email: " + emailValue + " | Validation message: " + validationMessage);

        assertFalse(validationMessage.isEmpty(),
                "Ожидалось сообщение о валидации для: " + emailValue);
    }


    @ParameterizedTest(name = "Проверка валидации email: {0}")
    @CsvSource({
            "testgmail.com",
            "test@gmail.",
            "test@",
            "test@@gmail.com",
    })

    @DisplayName("Проверка нативной HTML5 валидации поля email")
    void testInvalidEmails(String invalidEmail) {
        checkEmailValidation(invalidEmail);
    }
}
