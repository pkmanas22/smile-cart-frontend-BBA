import React, { memo, useEffect, useRef, useState } from "react";

import classNames from "classnames";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { append } from "ramda";
import { useParams } from "react-router-dom";

const Carousel = () => {
  const [currentImagePosition, setCurrentImagePosition] = useState(0);
  const { slug } = useParams();

  const timerRef = useRef(null);

  const { data: { imageUrl, imageUrls: partialImageUrls, title } = {} } =
    useShowProduct(slug);

  const imageUrls = append(imageUrl, partialImageUrls);

  const handlePrevious = () => {
    setCurrentImagePosition(
      pos => (pos - 1 + imageUrls.length) % imageUrls.length
    );
    resetTimer();
  };

  const handleNext = () =>
    setCurrentImagePosition(pos => (pos + 1) % imageUrls.length);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 3000);
  };

  useEffect(() => {
    timerRef.current = setInterval(handleNext, 3000);

    return () => clearInterval(timerRef.current);
  }, []);

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
          onClick={() => {
            handleNext();
            resetTimer();
          }}
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
            onClick={() => {
              setCurrentImagePosition(idx);
              resetTimer();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Carousel);
