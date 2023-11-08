import { ListContents, TipBox } from "../DisasterDetail";

interface IDisaterArray {
  name: string;
  arrayData:
    | string[]
    | { mainTitle?: string; title: string; desc: string | string[] }[];
  tip?: string;
}

export default function DisasterList({ name, arrayData, tip }: IDisaterArray) {
  return (
    <ul>
      <h2>{name}</h2>
      {tip ? (
        <TipBox>
          <div>
            <img src="/assets/icon/alert.png" alt="" />
          </div>
          <p>{tip}</p>
        </TipBox>
      ) : null}

      {arrayData.map((data, index) => {
        if (typeof data === "object") {
          return (
            <div key={`before-${index}`}>
              <h3>
                {name === "발생 이후" && data.mainTitle ? data.mainTitle : null}
              </h3>

              <h3>
                {data.mainTitle ? null : `${index + 1}.`}
                <span>{data.title}</span>
              </h3>
              {typeof data.desc === "object" ? (
                data.desc.map((acc, accIndex) => {
                  return (
                    <ListContents key={`acc-desc-${accIndex}`}>
                      {acc}
                    </ListContents>
                  );
                })
              ) : (
                <ListContents>{data.desc}</ListContents>
              )}
            </div>
          );
        }
        return (
          <ListContents key={`before-${index}`}>{data.toString()}</ListContents>
        );
      })}
    </ul>
  );
}
