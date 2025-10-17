package Pasport;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.LoadState;
import org.junit.jupiter.api.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CorrectSPATest {
    static Playwright playwright;
    static Browser browser;
    BrowserContext context;
    Page page;

    @BeforeAll
    static void setUpAll() {
        playwright = Playwright.create();
        browser = playwright.firefox().launch(new BrowserType.LaunchOptions().setHeadless(false));
    }

    @BeforeEach
    void setUp() {
        context = browser.newContext();
        page = context.newPage();
    }

    @AfterEach
    void tearDown() {
        page.close();
        context.close();
    }

    @AfterAll
    static void tearDownAll() {
        browser.close();
        playwright.close();
    }

    @Test
    void checkMainSectionsLoaded() {
        System.out.println("Проверяем основные разделы страницы...");
        page.navigate("https://pasport.me/");

        page.waitForLoadState(LoadState.NETWORKIDLE);

        List<String> sections = List.of("For APP/WEB", "Financial companies", "Why is it safe");

        for (String section : sections) {
            boolean isVisible = page.locator("text=" + section).count() > 0;
            System.out.println(section + (isVisible ? " найден " : " не найден"));
            assertTrue(isVisible, "Раздел '" + section + "' должен быть на странице");
        }

        page.onConsoleMessage(msg -> {
            if (msg.type().equals("error")) {
                System.out.println("Ошибка JS: " + msg.text());
                Assertions.fail("На странице есть JS-ошибки");
            }
        });

        System.out.println("Страница загружена корректно");
    }
}
