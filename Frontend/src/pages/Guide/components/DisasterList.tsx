import { ListContents } from "../DisasterDetail";

interface IDisaterArray {
  name: string;
  arrayData: string[] | { title: string; desc: string | string[] }[];
}

export default function DisasterList({ name, arrayData }: IDisaterArray) {
  return (
    <ul>
      <h2>{name}</h2>
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
