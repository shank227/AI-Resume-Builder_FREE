import React from 'react';

const Banner = () => {
  return (
    <div>
      <div
        className="
          w-full py-2.5 font-medium text-sm text-white text-center
          bg-gradient-to-r
          from-[indigo]
          to-[oklch(62%_0.199_265.638)]
        "
      >
        <p>
          <span className="px-3 py-1 rounded-lg text-white bg-black-600 mr-2">
            Build
          </span>
            Responsive CVs Faster
        </p>
      </div>
    </div>
  );
};

export default Banner;
