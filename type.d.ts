interface RootObject {
  posted: Posted[];
}

interface Posted {
  packageName: string;
  systemTime: number;
  isClearable: boolean;
  group?: string;
  tickerText: string;
  title: string;
  titleBig: string;
  text: string;
  textBig: string;
  textInfo: string;
  textSub: string;
  textSummary: string;
  appName: string;
}