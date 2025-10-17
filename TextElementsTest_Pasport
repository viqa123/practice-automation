package Pasport;
import com.microsoft.playwright.*;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class TextElementsTest {
    static Playwright playwright;
    static Browser browser;
    BrowserContext context;
    Page page;

    @BeforeAll
    static void setUpAll() {
        playwright = Playwright.create();
        browser = playwright.firefox().launch(
                new BrowserType.LaunchOptions().setHeadless(false)
        );
    }

    @BeforeEach
    void setUp() {
        context = browser.newContext();
        page = context.newPage();
        page.setDefaultTimeout(30000);
    }

    @AfterEach
    void tearDown() {
        context.close();
    }

    @AfterAll
    static void tearDownAll() {
        browser.close();
        playwright.close();
    }

    @Test
    @DisplayName("Проверка текста кнопок, заголовков, placeholder-ов на главной странице")
    void testTextElements() {
        page.navigate("https://pasport.me/");
        page.waitForLoadState();

        Locator heading = page.locator("div.header").first();
        assertTrue(heading.isVisible(), "Заголовок должен быть видим");
        String headingText = heading.innerText().trim();
        assertFalse(headingText.isEmpty(), "Заголовок не должен быть пустым");
        System.out.println("Заголовок страницы: " + headingText);

        Locator restoreButton = page.locator("text=Restore access");
        assertTrue(restoreButton.isVisible(), "Кнопка Restore Button должна отображаться");
        assertEquals("Restore access", restoreButton.innerText().trim(),
                "Текст кнопки должен быть Restore access");

        Locator signInLabel = page.locator("div.login-qr.flex-row > p").first();
        assertTrue(signInLabel.isVisible(), "Надпись 'Sign-In/Up via Pasport app' должна быть видна");
        String actualText = signInLabel.innerText().trim();
        String normalizedText = actualText.replaceAll("\\n+", "\n");
        String expectedText = "Sign-In/Up\nvia Pasport app";
        assertEquals(expectedText, normalizedText,
                "Текст надписи должен быть с переносом строки:\nSign-In/Up\nvia Pasport app");
        System.out.println("Текст найден:\n" + normalizedText);

        restoreButton.click();
        Locator emailInput = page.locator("input[type='email']");
        assertTrue(emailInput.isVisible(), "Поле email должно отображаться");
        String emailPlaceholder= emailInput.getAttribute("placeholder");
        assertNotNull(emailPlaceholder, "У поля Email должен быть placeholder");
        System.out.println("Placeholder поля Email: " + emailPlaceholder);
    }
}
