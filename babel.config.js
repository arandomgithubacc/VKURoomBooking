module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin", // 👈 Dòng này bắt buộc phải nằm ở CUỐI CÙNG trong mảng plugins
    ],
  };
};
