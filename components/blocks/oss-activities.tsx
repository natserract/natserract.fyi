type Activity = {
  org: string;
  prUrl: string;
};

const data: Activity[] = [
  {
    org: "roboflow.inference",
    prUrl: "https://github.com/roboflow/inference/pull/488",
  },
  {
    org: "material-ui",
    prUrl: "https://github.com/mui/material-ui/pull/42533",
  },
  {
    org: "react-hook-signal",
    prUrl: "https://github.com/arif-rachim/react-hook-signal/pull/1",
  },
  {
    org: "teknologi-umum",
    prUrl: "https://github.com/teknologi-umum/blog/pull/102",
  },
];

export const OSSActivities = () => {
  return (
    <div className="mb-7 text-sm font-lato">
      <h3 className="text-2xl font-bold mb-5 border-b border-gray-250 font-eb-garamond">
        OSS Activities
      </h3>

      <ul className="list-disc ml-5">
        {data.map((d) => {
          return (
            <li className="last:mb-0 mb-1" key={d.org}>
              <div className="flex flex-row gap-2">
                <a
                  target="_blank"
                  className="underline grayscale hover:text-blue-600"
                  href={d.prUrl}
                >
                  {d.prUrl}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
