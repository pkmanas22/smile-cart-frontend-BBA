import React, { useState } from "react";

import classNames from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ imageUrls, title }) => {
  const [currentImagePosition, setCurrentImagePosition] = useState(0);

  const handlePrevious = () =>
    setCurrentImagePosition(
      pos => (pos - 1 + imageUrls.length) % imageUrls.length
    );

  const handleNext = () =>
    setCurrentImagePosition(pos => (pos + 1) % imageUrls.length);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Button
          className="flex-shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handlePrevious}
        />
        <img
          alt={title}
          className="max-w-56 h-56 max-h-56 w-56"
          src={imageUrls[currentImagePosition]}
        />
        <Button
          className="flex-shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={handleNext}
        />
      </div>
      <div className="mt-2 flex items-center justify-center text-center">
        {imageUrls.map((_, idx) => (
          <span
            key={idx}
            className={classNames(
              "ml-3 h-3 w-3 cursor-pointer rounded-full border border-solid border-black",
              { "bg-black": currentImagePosition === idx }
            )}
            onClick={() => setCurrentImagePosition(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
