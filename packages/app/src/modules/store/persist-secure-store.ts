import { PersistStorage, StorageValue } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

export class PersistSecureStore<T> implements PersistStorage<T> {
  async getItem(key: string) {
    const item = await SecureStore.getItemAsync(key);

    return JSON.parse(item) as StorageValue<T>;
  }
  async setItem(key: string, value: StorageValue<T>) {
    const jsonValue = JSON.stringify(value);
    return SecureStore.setItemAsync(key, jsonValue);
  }
  async removeItem(key: string) {
    return SecureStore.deleteItemAsync(key);
  }
}
