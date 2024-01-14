interface DictionaryEntry {
    homeTitle: String;
    modalCreateRoomTitle: string;
    modalCreateRoomInputRoomeName: string;
    modalCreateRoomErrorMessageRoomName: string;
    modalCreateRoomInputTotalPlayer: string;
    buttonBack: string;
    buttonCreate: string;
    buttonCreateRoom: string;
    buttonCancel: string;
    buttonDeleteRoom: string;
    buttonGoogleSignIn: string;
    buttonLogout: string;
    buttonNext: string;
    inputPlaceholder: string;
    statusPerson: string;
}

export const dictionary: Record<string, DictionaryEntry> = {
    en: {
        homeTitle: "Cashflow Tools",
        modalCreateRoomTitle: "Create new room",
        modalCreateRoomInputRoomeName: "Room name",
        modalCreateRoomErrorMessageRoomName:
            "Room name must be at least 2 characters and less than 16 characters.",
        modalCreateRoomInputTotalPlayer: "Total player",
        buttonBack: "Back",
        buttonCreate: "Create",
        buttonCreateRoom: "Create room",
        buttonCancel: "Cancel",
        buttonDeleteRoom: "Delete room",
        buttonGoogleSignIn: "SignIn with Google",
        buttonLogout: "SignOut",
        buttonNext: "Next",
        inputPlaceholder: "Search room",
        statusPerson: "Ready",
    },
    vi: {
        homeTitle: "Công Cụ Cashflow ",
        modalCreateRoomTitle: "Tạo phòng mới",
        modalCreateRoomInputRoomeName: "Tên phòng",
        modalCreateRoomErrorMessageRoomName:
            "Tên phòng phải có ít nhất 2 ký tự và dưới 16 ký tự",
        modalCreateRoomInputTotalPlayer: "Tổng người chơi",
        buttonBack: "Quay lại",
        buttonCreate: "Tạo mới",
        buttonCreateRoom: "Tạo phòng",
        buttonCancel: "Hủy bỏ",
        buttonDeleteRoom: "Xóa phòng",
        buttonGoogleSignIn: "Đăng nhập với Google",
        buttonLogout: "Đăng xuất",
        buttonNext: "Tiếp tục",
        inputPlaceholder: "Tìm Phòng",
        statusPerson: "Sẵn sàng",
    },
};
