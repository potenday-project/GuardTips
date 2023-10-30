import { ListContents, TipBox } from "../DisasterDetail";

interface IDisaterArray {
  name: string;
  arrayData: string[] | { title: string; desc: string | string[] }[];
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
            <li key={`before-${index}`}>
              <h3>
                {index + 1}.<span>{data.title}</span>
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
            </li>
          );
        }
        return (
          <ListContents key={`before-${index}`}>{data.toString()}</ListContents>
        );
      })}
    </ul>
  );
}
