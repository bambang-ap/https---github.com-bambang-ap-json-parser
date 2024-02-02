type RootObject = {
  posted: Posted[];
};

type Posted = {
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
};
