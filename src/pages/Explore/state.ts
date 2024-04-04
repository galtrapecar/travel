import { atom } from "recoil";

const startLocationAtom = atom<string>({
    key: 'startLocation',
    default: '',
})