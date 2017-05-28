import { SocialPage } from './app.po';

describe('social App', () => {
  let page: SocialPage;

  beforeEach(() => {
    page = new SocialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
