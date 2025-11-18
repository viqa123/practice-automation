package Pasport;

import com.microsoft.playwright.*;
import org.junit.jupiter.api.*;
import com.microsoft.playwright.options.WaitForSelectorState;

import static org.junit.jupiter.api.Assertions.*;

public class BackButtonAndLogoTest {
    static Playwright playwright;
    static Browser browser;
    BrowserContext context;
    Page page;

    private final String homeUrl = "https://pasport.me";
    private final String innerUrl = "https://pasport.me/app";

    @BeforeAll
    static void setUpAll() {
        playwright = Playwright.create();
        browser = playwright.firefox()
                .launch(new BrowserType.LaunchOptions().setHeadless(false));
    }

    @BeforeEach
    void setUp() {
        context = browser.newContext();
        page = context.newPage();
        page.setDefaultTimeout(120000);
        page.setDefaultNavigationTimeout(120000);
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
    @DisplayName("Клик по логотипу возвращает на главную страницу")
    void logoReturnsToHome() {
        page.navigate(innerUrl);
        assertNotEquals(homeUrl, page.url(),
                "Стартовая страница не должна быть главной");

        Locator logo = page.locator("div.header-left > img");
        logo.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        logo.scrollIntoViewIfNeeded();
        System.out.println("Логотип найден и готов к клику");

        logo.click(new Locator.ClickOptions().setNoWaitAfter(true));
        page.waitForURL(url -> url.contains(homeUrl));

        assertTrue(page.url().startsWith(homeUrl),
                "После клика по логотипу не открылась главная страница");

        Locator mainContent = page.locator("text=Pasport").first();
        mainContent.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        assertTrue(mainContent.isVisible(), "Главный контент не отображается после перехода");
    }

    @Test
    @DisplayName("Навигация 'Назад' через браузер возвращает на главную страницу")
    void browserBackReturnsToHome() {

        page.navigate(innerUrl);
        assertEquals(innerUrl, page.url(),
                "Не удалось открыть внутреннюю страницу");

        page.goBack();

        page.waitForURL(url -> url.contains(homeUrl));

        assertTrue(page.url().startsWith(homeUrl),
                "После перехода назад не открылась главная страница");

        Locator mainContent = page.locator("text=Pasport").first();
        mainContent.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        assertTrue(mainContent.isVisible(), "Главная страница не отображается после возврата назад");
    }
}
