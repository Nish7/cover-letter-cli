export default function genDate() {
	const date = new Date();
	const d = date.getDate();
	const m = date.toLocaleString('default', { month: 'long' });
	const y = date.getFullYear();
	const friendlyDate = `${m} ${d}, ${y}`;
	return friendlyDate;
}
