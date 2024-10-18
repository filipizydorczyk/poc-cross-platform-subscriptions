import { init } from "next/dist/compiled/webpack/webpack";
import puppeteer, { Browser, Page } from "puppeteer";

const ACCEPT_SELECTOR =
  "html body#yDmH0d.tQj5Y.ghyPEc.IqBfM.ecJEib.EWZcud.EIlDfe.cjGgHb.d8Etdd.LcUz9d c-wiz.SSPGKf div.T4LgNb div.kFwPee div div.v2Yske div.CqMh6b div.qqtRac div.KZ9vpc form div.lssxud div.VfPpkd-dgl2Hf-ppHlrf-sM5MNb button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.Gu558e span.VfPpkd-vQzf8d";
const CONTAINER_SELECTOR = "div#contents";
const THUMBNAILS_SELECTOR = "a#thumbnail.inline-block[href]";

export class ChromeBrowser {
  private browser: Browser | undefined;
  private page: Page | undefined;

  async init() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async fetchTheFeed(sub: string) {
    if (!this.page || !this.browser) {
      console.warn("Chrome Browser was not initialized!");
      return;
    }

    await this.page.goto(sub);

    await this.page.locator(ACCEPT_SELECTOR).click();
    await this.page.locator(CONTAINER_SELECTOR).waitHandle();

    const thumbnailsElements = await this.page.$$(THUMBNAILS_SELECTOR);
    const fetchedData = await Promise.all(
      thumbnailsElements.map(async (thumbnailElement) => {
        const imgElements = await thumbnailElement.$$("img");
        const link = await thumbnailElement.evaluate((element) => element.href);
        const imgs = await Promise.all(
          imgElements.map((imageElement) => imageElement.evaluate((element) => element.src))
        );

        return { link, img: imgs[0] };
      })
    );

    return fetchedData;
  }

  async close() {
    if (this.browser) this.browser.close();
  }
}
