import { DndTvPage } from './app.po';

describe('dnd-tv App', () => {
  let page: DndTvPage;

  beforeEach(() => {
    page = new DndTvPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
