function HospitalTypes()
{
	return(
		<ul>
			<li><a href="?Unit=Clinic">Поліклініка</a></li>
			<li><a href="?Unit=Hospital&Section=HospitalPatients">Стаціонар</a></li>
		</ul>
	)
}

ReactDOM.render(<HospitalTypes/>,document.getElementById('HospitalTypes'));