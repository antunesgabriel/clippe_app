import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

type LogoProps = {
  width?: number;
  height?: number;
  clipColor?: string;
  balonColor?: string;
};

const Logo: React.FC<LogoProps> = (
  {
    width = 148.205,
    height = 154.106,
    clipColor = '#6c5ce7',
    balonColor = '#fff',
  },
  rest,
) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 148.205 154.106"
      {...rest}>
      <G data-name="Group 3">
        <Path
          d="M131.439 138.158c-2.652-6.479-1.608-16.526 2.317-22.319 0 0 14.449-21.333 14.449-41.736a74.1 74.1 0 10-74.1 74.1c7.956 0 10.421-.6 10.421-.6 6.806-1.645 17.865-1.362 24.577.633l17.919 5.323c6.712 1.991 10.032-1.68 7.384-8.158z"
          fill={balonColor}
        />
        <Path
          data-name="Path 16"
          d="M94.176 44.029a14.053 14.053 0 015.132 19.156l-17.31 30.002a3.9 3.9 0 001.427 5.327l.06.034a3.907 3.907 0 005.327-1.427l17.294-30.012a21.584 21.584 0 002.761-8.22 21.9 21.9 0 00-4.253-15.87 21.573 21.573 0 00-6.49-5.731l-.051-.03a21.68 21.68 0 00-8.234-2.768A21.874 21.874 0 0068.2 45.235L41.42 91.714a17.188 17.188 0 00-1.757 13.16 16.5 16.5 0 0020.475 11.82 17.307 17.307 0 0010.556-8.108l15.65-27.107a13.336 13.336 0 001.668-9.41 11.645 11.645 0 00-14.601-8.79 13.093 13.093 0 00-7.753 6.28l-6.325 11.013A3.9 3.9 0 0060.76 85.9l.068.039a3.9 3.9 0 005.327-1.428l.054-.092c.527-.914 6.25-10.847 6.295-10.923 3.042-5.27 10.11-1.3 7.019 4.052L63.887 104.65l-.234.406a8.987 8.987 0 01-5.23 3.983 9.2 9.2 0 01-6.624-.464 8.964 8.964 0 01-.458-.242 8.632 8.632 0 01-3.975-5.497 9.756 9.756 0 01.757-6.838l.214-.372 26.724-46.463.2-.346a14.01 14.01 0 0118.92-4.781z"
          fill={clipColor}
        />
      </G>
    </Svg>
  );
};

export default Logo;
