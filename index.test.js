import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { isPropertySetInCss } from './utility.js';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, './index.css'), 'utf8');

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  });

  it('html-0 Sayfanın head bölümüne Türkçe karakterleri destekleyecek karakter seti için meta tag eklenmiş', () => {
    const cssMetaTag = dom.window.document.head.querySelector(
      'meta[charset="UTF-8"]'
    );
    expect(cssMetaTag).toBeInTheDocument();
  });

  it('html-1 CSS dosyası sayfaya eklenmiş', () => {
    const cssLinkTag = dom.window.document.head.querySelector(
      'link[href*="index.css"]'
    );
    expect(cssLinkTag).toBeInTheDocument();
  });

  it("html-2 Roboto Mono ve Chelsea Market fontları google font'tan eklenmiş.", () => {
    const roboto = dom.window.document.head.querySelector('link[href*=Roboto]');
    const chelsea = dom.window.document.head.querySelector(
      'link[href*=Chelsea]'
    );
    expect(roboto).toBeInTheDocument();
    expect(chelsea).toBeInTheDocument();
  });

  it("html-3 Sayfanın head bölümüne başlık ve 'Peri Bacaları Tanıtımı' eklenmiş.", () => {
    const csstitleTag = dom.window.document.head.querySelector('title');
    expect(csstitleTag).toBeInTheDocument();
    expect(csstitleTag.textContent).toBe('Peri Bacaları Tanıtımı');
  });

  it('html-4 header bölümü doğru class ile eklenmiş', () => {
    const element = container.querySelector('header.container');
    expect(element).toBeInTheDocument();
  });

  it("html-5 header bölümü'ne navigasyon menüsü eklenmiş", () => {
    const element = container.querySelector('header nav');
    expect(element).toBeInTheDocument();
  });

  it("html-5 navigasyon bölümü'nde 3 adet link eklenmiş", () => {
    const element = container.querySelectorAll('header nav a');
    expect(element.length).toBe(3);
  });

  it("html-5 navigasyon bölümü'nde 3 adet link doğru metinler ve sıralama ile eklenmiş", () => {
    const element = container.querySelectorAll('header nav a');
    expect(element.length).toBe(3);
    expect(element[0].textContent).toMatch(/Gezinizi Planlayın/i);
    expect(element[1].textContent).toMatch(/Bilgi Edinin/i);
    expect(element[2].textContent).toMatch(/Karşılaştırın/i);
  });

  it("html-6 main-section bölümü section tag'i ve doğru classlar ile eklenmiş eklenmiş", () => {
    const element = container.querySelector('section.main-section.container');
    expect(element).toBeInTheDocument();
  });

  it('html-7 main-section içinde img doğru resim ile eklenmiş', () => {
    const element = container.querySelector(
      '.main-section img[src*="assets/header_img.jpg"]'
    );
    expect(element).toBeInTheDocument();
  });

  it("html-8 main-content class'ına sahip div alanı eklenmiş", () => {
    const element = container.querySelector('div.main-content');
    expect(element).toBeInTheDocument();
  });

  it("html-9 main-content içinde h1 tag'i doğru metin ile kullanılmış", () => {
    const element = container.querySelector('.main-content h1');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Peri Bacaları Tanıtımı');
  });

  it('html-10 main-content içinde 2 cümle doğru tag(p) ile eklenmiş', () => {
    const elements = container.querySelectorAll('.main-content p');
    expect(elements[0].textContent).toMatch(/Peri Bacaları Tanıtımı Gelin/i);
    expect(elements[1].textContent).toMatch(/Sürekli açık/i);
  });

  it('html-11 info-section bölümü doğru tag ve class ile eklenmiş', () => {
    const element = container.querySelector('section.info-section.container');
    expect(element).toBeInTheDocument();
  });

  it('html-12 info-section bölümüne 2 paragraf doğru eklenmiş', () => {
    const elements = container.querySelectorAll('.info-section p');
    expect(elements.length).toBe(2);
    expect(elements[0].textContent).toMatch(/Sadece ülkemizin değil/i);
    expect(elements[1].textContent).toMatch(/Peri bacaları oluşumunun/i);
  });

  it("html-13 features-section bölümü doğru tag ve class'lar ile eklenmiş", () => {
    const element = container.querySelector(
      'section.features-section.container'
    );
    expect(element).toBeInTheDocument();
  });

  it("html-14 features-card class'ına sahip div hot-air-baloon için eklenmiş", () => {
    const element = container.querySelectorAll('.features-card');
    expect(element[0]).toBeInTheDocument();
    const img = container.querySelector(
      '.features-card img[src*="assets/hot-air-balloon.svg"]'
    );
    expect(img).toBeInTheDocument();
  });

  it('html-15  hot-air-baloon resmi eklenmiş', () => {
    const img = container.querySelector(
      '.features-card img[src*="assets/hot-air-balloon.svg"]'
    );
    expect(img).toBeInTheDocument();
  });

  it('html-16 hot-air-baloon metni eklenmiş ve ilgili bölüm bold yapılmış', () => {
    const paragraf = container
      .querySelector('.features-card img[src*="assets/hot-air-balloon.svg"]')
      .parentNode.querySelector('p');
    expect(paragraf.textContent).toMatch(/Kapadokya denilince akla/i);
    const span = paragraf.querySelector('span.emphasize');
    expect(span).toBeInTheDocument();
    expect(span.textContent).toMatch(/olağanüstü ve rüya gibi bir deneyim/i);
  });

  it("html-17 features-card class'ına sahip div atv için eklenmiş", () => {
    const element = container.querySelectorAll('.features-card');
    expect(element[1]).toBeInTheDocument();
    const img = container.querySelector(
      '.features-card img[src*="assets/atv.svg"]'
    );
    expect(img).toBeInTheDocument();
  });

  it('html-18 atv resmi eklenmiş', () => {
    const img = container.querySelector(
      '.features-card img[src*="assets/hot-air-balloon.svg"]'
    );
    expect(img).toBeInTheDocument();
  });

  it('html-19 atv metni eklenmiş ve ilgili bölüm bold yapılmış', () => {
    const paragraf = container
      .querySelector('.features-card img[src*="assets/atv.svg"]')
      .parentNode.querySelector('p');
    expect(paragraf.textContent).toMatch(/ATV turları, Kapadokya'yı gezmenin/i);
    const span = paragraf.querySelector('span.emphasize');
    expect(span).toBeInTheDocument();
    expect(span.textContent).toMatch(/dünyanın en iyi ATV turlarından birini/i);
  });

  it('html-20 Footer bölümü eklenmiş', () => {
    const element = container.querySelector('footer');
    expect(element).toBeInTheDocument();
  });

  it("html-21 Footer'daki navigasyon bölümü'nde 3 adet link doğru metinler ve sıralama ile eklenmiş", () => {
    const element = container.querySelectorAll('footer nav a');
    expect(element.length).toBe(3);
    expect(element[0].textContent).toMatch(/Gezinizi Planlayın/i);
    expect(element[1].textContent).toMatch(/Bilgi Edinin/i);
    expect(element[2].textContent).toMatch(/Karşılaştırın/i);
  });

  it("html-22 Footer'da navigasyon bölümü doğru tag ve class ile eklenmiş", () => {
    const element = container.querySelector('footer nav.container');
    expect(element).toBeInTheDocument();
  });

  it('css-1 sayfa kenarındaki boşluklar margin ve padding ile yok edilmiş ve default font ayarlanmış', () => {
    expect(isPropertySetInCss(css, 'body', 'margin', '0')).toBe(true);
    expect(isPropertySetInCss(css, 'body', 'padding', '0')).toBe(true);
    expect(
      isPropertySetInCss(css, 'body', 'font-family', "'Roboto Mono'")
    ).toBe(true);
  });

  it("css-2 container class'ı için istenen 2 kural da ayarlanmış.", () => {
    expect(isPropertySetInCss(css, '.container', 'width', '750px')).toBe(true);
    expect(isPropertySetInCss(css, '.container', 'margin', '0 auto')).toBe(
      true
    );
  });

  it('css-3 nav a için istenen tüm kurallar ayarlanmış', () => {
    expect(isPropertySetInCss(css, 'nava', 'width', '18%')).toBe(true);
    expect(isPropertySetInCss(css, 'nava', 'height', '3%')).toBe(true);
    expect(
      isPropertySetInCss(css, 'nava', 'background', '#5ED3EB') ||
        isPropertySetInCss(css, 'nava', 'background-color', '#5ED3EB')
    ).toBe(true);
    expect(isPropertySetInCss(css, 'nava', 'color', 'white')).toBe(true);
    expect(isPropertySetInCss(css, 'nava', 'text-decoration', 'none')).toBe(
      true
    );
    expect(isPropertySetInCss(css, 'nava', 'border-radius', '10px')).toBe(true);
    expect(isPropertySetInCss(css, 'nava', 'text-align', 'center')).toBe(true);
  });

  it('css-4 nav a, ilk child olduğunda istenen tüm kurallar ayarlanmış', () => {
    expect(
      isPropertySetInCss(css, 'nava:first-child', 'background', '#FF764E') ||
        isPropertySetInCss(
          css,
          'nava:first-child',
          'background-color',
          '#FF764E'
        )
    ).toBe(true);
    expect(
      isPropertySetInCss(css, 'nava:first-child', 'padding', '10px 20px')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, 'nava:first-child', 'margin', '10px 1%')
    ).toBe(true);
  });

  it('css-5 nav a, son child olduğunda istenen tüm kurallar ayarlanmış', () => {
    expect(
      isPropertySetInCss(css, 'nava:last-child', 'background', '#ffcd69') ||
        isPropertySetInCss(
          css,
          'nava:last-child',
          'background-color',
          '#ffcd69'
        )
    ).toBe(true);
    expect(
      isPropertySetInCss(css, 'nava:last-child', 'margin', '10px 1%')
    ).toBe(true);
  });

  it("css-6 main-section class'ındaki tüm image'lar için doğru ayarlar yapılmış", () => {
    expect(
      isPropertySetInCss(css, '.main-sectionimg', 'border-radius', '100%')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.main-sectionimg', 'width', '30%')).toBe(
      true
    );
    expect(
      isPropertySetInCss(css, '.main-sectionimg', 'margin', '10% 2%')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.main-sectionimg', 'vertical-align', 'middle')
    ).toBe(true);
  });

  it("css-7 main-content class'ı için doğru ayarlar yapılmış", () => {
    expect(
      isPropertySetInCss(css, '.main-content', 'display', 'inline-block')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.main-content', 'vertical-align', 'middle')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.main-content', 'width', '60%')).toBe(true);
    expect(
      isPropertySetInCss(css, '.main-content', 'text-align', 'center')
    ).toBe(true);
  });

  it("css-8. heading 1 tag'i için font'lar 'Chelsea Market' ayarlanmış", () => {
    expect(
      isPropertySetInCss(css, 'h1', 'font-family', "'Chelsea Market'")
    ).toBe(true);
  });

  it("css-9. .info-section class'ı için doğru ayarlar yapılmış", () => {
    expect(
      isPropertySetInCss(css, '.info-section', 'background', '#ddb9a3') ||
        isPropertySetInCss(css, '.info-section', 'background-color', '#ddb9a3')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.info-section', 'padding', '10px 20px')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.info-section', 'color', 'white')).toBe(
      true
    );
    expect(
      isPropertySetInCss(css, '.info-section', 'border-radius', '20px')
    ).toBe(true);
  });

  it("css-10. emphasize class'ı için yazılar bold ayarlanmış", () => {
    expect(isPropertySetInCss(css, '.emphasize', 'font-weight', 'bold')).toBe(
      true
    );
  });

  it('css-11. footer arkaplan rengi #F9E7DC ve min-genişliği 750px ayarlanmış', () => {
    expect(
      isPropertySetInCss(css, 'footer', 'background', '#f9e7dc') ||
        isPropertySetInCss(css, 'footer', 'background-color', '#f9e7dc')
    ).toBe(true);
    expect(isPropertySetInCss(css, 'footer', 'min-width', '750px')).toBe(true);
  });

  it('css-12. footer içindeki image için genişlik ve yükseklik ayarları yapılmış', () => {
    expect(isPropertySetInCss(css, 'footerimg', 'width', '100%')).toBe(true);
    expect(isPropertySetInCss(css, 'footerimg', 'height', '150px')).toBe(true);
  });

  it('css-12. footer içindeki image için taşan kısımlar doğru kırpılmış', () => {
    expect(isPropertySetInCss(css, 'footerimg', 'object-fit', 'cover')).toBe(
      true
    );
    expect(
      isPropertySetInCss(css, 'footerimg', 'object-position', '50% 20%')
    ).toBe(true);
  });
});
