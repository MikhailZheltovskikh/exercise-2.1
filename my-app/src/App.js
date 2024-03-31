import styles from './app.module.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState(0);
	const [list, setList] = useState([]);
	const [error, setError] = useState(0);

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');

		if (promptValue.length >= 3) {
			setValue(promptValue);
			setError('');
		} else {
			setError('Введенное значение должно содержать минимум 3 символа');
		}
	};

	let isValueVaild;
	if (value.length >= 3) {
		isValueVaild = true;
	} else {
		isValueVaild = false;
	}

	const onAddButtonClick = () => {
		if (value.length >= 3) {
			const updatedList = [
				...list,
				{ id: Date.now(), value: value.trim(), date: new Date() },
			];
			setList(updatedList);
			setValue('');
			setError('');
		}
	};

	const formatDate = (date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		const formattedDate = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
		return formattedDate;
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>

				{list.length > 0 ? (
					<ul className={styles.list}>
						{list.map((item) => (
							<li key={item.id}>
								{item.value} <span>дата: {formatDate(item.date)}</span>
							</li>
						))}
					</ul>
				) : (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	);
};
