import React, { useRef, useState } from "react";

import { TooltipWrapper } from "components/common";
import { VALID_COUNT_REGEX } from "components/constants";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Alert, Button, Input, Toastr, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

const ProductQuantity = ({ slug, name }) => {
  //   const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
  //     paths([["cartItems", slug], ["setSelectedQuantity"]]),
  //     shallow
  //   );

  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);

  const countInputRef = useRef();

  const { t } = useTranslation();

  const { selectedQuantity, updateSelectedQuantity } =
    useSelectedQuantity(slug);

  const parsedQuantity = parseInt(selectedQuantity) || 0;

  const { data: { availableQuantity } = {} } = useShowProduct(slug);

  const isNotValidQuantity = parsedQuantity >= availableQuantity;

  const preventNavigation = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSetCount = e => {
    const { value } = e.target;
    const isNotValidInputQuantity = parseInt(value) > availableQuantity;

    if (isNotValidInputQuantity) {
      Toastr.error(t("error.quantityLimit", { count: availableQuantity }), {
        autoClose: 2000,
      });
      updateSelectedQuantity(availableQuantity);
      countInputRef.current.blur();
    } else if (VALID_COUNT_REGEX.test(value) && value !== "") {
      updateSelectedQuantity(value);
    }
  };

  return (
    <div className="inline-flex items-center rounded-md border border-black">
      <Button
        className="focus-within:ring-0"
        label="-"
        style="text"
        onClick={e => {
          preventNavigation(e);
          if (name && parsedQuantity === 1) {
            setShouldShowDeleteAlert(true);

            return;
          }
          updateSelectedQuantity(parsedQuantity - 1);
        }}
      />
      <Alert
        isOpen={name && shouldShowDeleteAlert}
        submitButtonLabel={t("removeItemConfirmation.button")}
        title={t("removeItemConfirmation.title")}
        message={
          <Typography>
            <Trans
              components={{ typography: <strong /> }}
              i18nKey="removeItemConfirmation.message"
              values={{ name }}
            />
          </Typography>
        }
        onClose={() => setShouldShowDeleteAlert(false)}
        onSubmit={() => {
          updateSelectedQuantity(parsedQuantity - 1);
          setShouldShowDeleteAlert(false);
        }}
      />
      <Input
        nakedInput
        className="ml-2"
        contentSize="2"
        ref={countInputRef}
        value={selectedQuantity}
        onChange={handleSetCount}
        onClick={preventNavigation}
      />
      <TooltipWrapper
        content={t("error.maximumUnitTooltip")}
        position="top"
        showTooltip={isNotValidQuantity}
      >
        <Button
          className="focus-within:ring-0"
          disabled={isNotValidQuantity}
          label="+"
          style="text"
          onClick={e => {
            preventNavigation(e);
            updateSelectedQuantity(parsedQuantity + 1);
          }}
        />
      </TooltipWrapper>
    </div>
  );
};

export default ProductQuantity;
