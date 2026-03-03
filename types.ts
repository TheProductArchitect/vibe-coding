export interface VibeResponse {
  colorPalette: string[];
  fontPairing: string;
  layoutStyle: string;
  reasoning: string;
  uiElementName: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

export enum AppState {
  HOME = 'HOME',
  NEW_TO_VIBE = 'NEW_TO_VIBE',
  WHAT_IS_WEB_APP = 'WHAT_IS_WEB_APP',
  BUILD_WORKFLOW = 'BUILD_WORKFLOW'
}
