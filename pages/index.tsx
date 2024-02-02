import moment from "moment";
import React, { useEffect, useState } from "react";

export function importData<T extends object>(file?: File) {
  return new Promise<T | undefined>((resolve, reject) => {
    if (!file) return resolve(undefined);

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const data = event.target?.result;

      try {
        resolve(JSON.parse(data as string));
      } catch (err) {
        reject(err);
      }
    };

    fileReader.readAsBinaryString(file);
  });
}

export default function Home() {
  const [selectPkgs, setSelectPkgs] = useState<string[]>([]);
  const [file, setFile] = useState<File>();
  const [search, setSearch] = useState("");
  const [jsonData = { posted: [] }, setJsonData] = useState<RootObject>();

  const packages = [...new Set(jsonData.posted.map((e) => e.packageName))];

  const posted = jsonData.posted.filter((e) => {
    const { title, text, textBig } = e;

    const a = selectPkgs.includes(e.packageName);
    const b = [title, text, textBig]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    if (selectPkgs.length === 0) return b;

    return a && b;
  });

  function toggled(p: string) {
    setSelectPkgs((prev) => {
      if (prev.includes(p)) {
        return prev.remove(prev.indexOf(p));
      }

      return [...new Set([...prev, p])];
    });
  }

  useEffect(() => {
    importData<RootObject>(file).then(setJsonData);
  }, [file]);

  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded-xl"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="flex-1 border p-2 rounded-xl"
          type="file"
          accept=".json"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (!selectedFile) return;
            setFile(selectedFile);
          }}
        />
      </div>

      <div className="flex gap-2">
        {packages.map((p) => {
          const selected = selectPkgs.includes(p);
          return (
            <button
              className={classNames("flex-1 p-4 rounded-xl text-white", {
                "bg-gray-700": !selected,
                "bg-green-700": selected,
              })}
              onClick={() => toggled(p)}
            >
              {p}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        {posted.map((post) => {
          const { appName, text, textBig, systemTime, title, group } = post;
          return (
            <div className="border p-4 rounded-xl">
              <div className="flex justify-between">
                <div>
                  {appName} - {title}
                </div>
                <div>
                  {moment(systemTime).format("DD MMM YYYY HH:mm:ss:ms")}
                </div>
              </div>
              <div>{group}</div>
              <div>{text}</div>
              <div>{textBig}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
