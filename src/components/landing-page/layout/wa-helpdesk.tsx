import { useState } from "react";
import Link from "next/link";

const WaHelpdesk = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed bottom-0 right-0 z-30 p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Membungkus SVG dengan Link */}
      <Link
        href="https://wa.me/62816282136"
        target="_blank"
        rel="noopener noreferrer"
        className="block" 
      >
        {/* SVG bagian pertama */}
        {!isHovered ? (
          <svg
            width="114"
            height="113"
            viewBox="0 0 114 113"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_7120_32010)">
              <circle cx="57" cy="53" r="37" fill="#28A745" />
            </g>
            <path
              d="M77.0815 39.3104C70.0278 28.3754 55.5828 25.1354 44.4115 31.9192C33.5103 38.7029 30.0003 53.4854 37.054 64.3867L37.6278 65.2642L35.2653 74.1067L44.1078 71.7442L44.9853 72.3179C48.799 74.3767 52.9503 75.5579 57.0678 75.5579C61.489 75.5579 65.9103 74.3767 69.724 72.0142C80.6253 64.9267 83.8653 50.4479 77.0815 39.2429V39.3104ZM70.9053 62.0579C69.724 63.8129 68.239 64.9942 66.1803 65.2979C64.999 65.2979 63.514 65.8717 57.6415 63.5429C52.6465 61.1804 48.4953 57.3329 45.559 52.9117C43.804 50.8529 42.8928 48.1867 42.6228 45.5204C42.6228 43.1579 43.5003 41.0992 44.9853 39.6142C45.559 39.0404 46.1665 38.7367 46.7403 38.7367H48.2253C48.799 38.7367 49.4065 38.7367 49.7103 39.9179C50.284 41.4029 51.769 44.9467 51.769 45.2504C52.0728 45.5542 51.9378 47.8154 50.5878 49.0979C49.8453 49.9417 49.7103 49.9754 50.014 50.5829C51.1953 52.3379 52.6803 54.1267 54.1315 55.6117C55.8865 57.0967 57.6753 58.2779 59.734 59.1554C60.3078 59.4592 60.9153 59.4592 61.219 58.8517C61.5228 58.2779 62.974 56.7929 63.5815 56.1854C64.1553 55.6117 64.459 55.6117 65.0665 55.8817L69.7915 58.2442C70.3653 58.5479 70.9728 58.8179 71.2765 59.1217C71.5803 59.9992 71.5803 61.1804 70.9728 62.0579H70.9053Z"
              fill="#FDFDFD"
            />
            <defs>
              <filter
                id="filter0_d_7120_32010"
                x="0"
                y="0"
                width="114"
                height="114"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.101961 0 0 0 0 0.101961 0 0 0 0 0.101961 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_7120_32010"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_7120_32010"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        ) : (
          <svg
            width="114"
            height="110"
            viewBox="0 0 114 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_7120_32009)">
              <circle cx="57" cy="53" r="37" fill="#FDFDFD" />
            </g>
            <path
              d="M77.081 39.3104C70.0273 28.3754 55.5823 25.1354 44.411 31.9192C33.5098 38.7029 29.9998 53.4854 37.0535 64.3867L37.6273 65.2642L35.2648 74.1067L44.1073 71.7442L44.9848 72.3179C48.7985 74.3767 52.9498 75.5579 57.0673 75.5579C61.4885 75.5579 65.9098 74.3767 69.7235 72.0142C80.6248 64.9267 83.8648 50.4479 77.081 39.2429V39.3104ZM70.9048 62.0579C69.7235 63.8129 68.2385 64.9942 66.1798 65.2979C64.9985 65.2979 63.5135 65.8717 57.641 63.5429C52.646 61.1804 48.4948 57.3329 45.5585 52.9117C43.8035 50.8529 42.8923 48.1867 42.6223 45.5204C42.6223 43.1579 43.4998 41.0992 44.9848 39.6142C45.5585 39.0404 46.166 38.7367 46.7398 38.7367H48.2248C48.7985 38.7367 49.406 38.7367 49.7098 39.9179C50.2835 41.4029 51.7685 44.9467 51.7685 45.2504C52.0723 45.5542 51.9373 47.8154 50.5865 49.0979C49.8448 49.9417 49.7098 49.9754 50.0135 50.5829C51.1948 52.3379 52.6798 54.1267 54.131 55.6117C55.885 57.0967 57.6748 58.2779 59.7335 59.1554C60.3073 59.4592 60.9148 59.4592 61.2185 58.8517C61.5223 58.2779 62.9735 56.7929 63.581 56.1854C64.1548 55.6117 64.4585 55.6117 65.066 55.8817L69.791 58.2442C70.3648 58.5479 70.9723 58.8179 71.276 59.1217C71.5798 59.9992 71.5798 61.1804 70.9723 62.0579H70.9048Z"
              fill="#28A745"
            />
            <defs>
              <filter
                id="filter0_d_7120_32009"
                x="0"
                y="0"
                width="114"
                height="114"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.101961 0 0 0 0 0.101961 0 0 0 0 0.101961 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_7120_32009"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_7120_32009"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        )}
      </Link>
    </div>
  );
};

export default WaHelpdesk;
