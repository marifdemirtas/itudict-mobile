import { useState } from "react";
import { HStack, IconButton, Input, ChevronLeftIcon, ChevronRightIcon, Text, Button } from "native-base";

export const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const [page, setPage] = useState(currentPage);
  const [pageInput, setPageInput] = useState(currentPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      setPage(page);
      setPageInput(page);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
      setPage(totalPages);
      setPageInput(totalPages);
    } else {
      setCurrentPage(1);
      setPage(1);
      setPageInput(1);
    }
  };

  return (
    <HStack justifyContent="center" alignItems="center" my={3}>
      <IconButton icon={<ChevronLeftIcon />} _icon={{ color: "darkBlue.100" }} onPress={() => handlePageChange(page - 1)} />
      <Input
        w="15%"
        py="5%"
        size="sm"
        textAlign="center"
        value={pageInput.toString()}
        onChangeText={(text) => {
          if (text === "") {
            setPageInput("");
          } else {
            setPageInput(parseInt(text));
          }
        }}
        onBlur={() => handlePageChange(pageInput)}
        keyboardType="numeric"
      />
      <Text fontSize="md" bold>
        {" "}
        /{" "}
      </Text>
      <Button
        size="sm"
        textAlign="center"
        bg="darkBlue.100"
        borderColor="black"
        borderWidth="1"
        _text={{ color: "black" }}
        onPress={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </Button>
      <IconButton
        icon={<ChevronRightIcon />}
        _icon={{ color: "darkBlue.100" }}
        onPress={() => {
          handlePageChange(page + 1);
          this.scroll;
        }}
      />
    </HStack>
  );
};
