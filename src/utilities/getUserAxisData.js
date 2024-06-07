export function getUserAxisData() {
  const xValue = parseInt(document.getElementById('xAxios').value);
  const yValue = parseInt(document.getElementById('yAxios').value);
  const zValue = parseInt(document.getElementById('zAxios').value);

  if (xValue < 1 || xValue > 10 || yValue < 1 || yValue > 10 || zValue < 1 || zValue > 10) {
    alert("Значения осей должны быть в диапазоне от 1 до 10");
    return;
  }

  return {xValue, yValue, zValue};
}