import { Alert } from '@material-tailwind/react'
import React from 'react'
import { useSelector } from 'react-redux'

const Information = () => {

	const isAuth = useSelector((state) => state.user.isAuth)

	return (
		<div className='flex items-center flex-col'>

			{!isAuth && <Alert className='w-3/4 my-8' color='green'>Log-In or Register to have access to the forum!!!</Alert>}

			<div className='w-3/4 flex flex-wrap bg-white p-8 rounded-lg my-8 shadow-md hover:shadow-green-glow'>
				<div className='w-full md:w-1/2 p-4'>
					<h1 className='text-2xl font-bold text-green-500 mb-4'>
						What is Climate Change?
					</h1>
					<p className=' text-gray-800'>
						Climate change refers to significant, long-term changes
						in the patterns of weather on our planet. It's a complex
						phenomenon resulting primarily from human activities,
						especially the burning of fossil fuels like coal, oil,
						and gas, which releases greenhouse gases such as carbon
						dioxide (CO2) and methane into the Earth's atmosphere.
						These gases trap heat from the sun, creating a
						'greenhouse effect' that leads to global warming.
					</p>
					<br />
					<p className=' text-gray-800'>
						Historically, Earth's climate has fluctuated, but the
						current phase of warming is occurring more rapidly than
						many past events. Scientists attribute this accelerated
						change largely to human activities since the Industrial
						Revolution. The consequences of this warming are
						far-reaching and include melting glaciers and ice caps,
						rising sea levels, and more extreme weather events like
						hurricanes, droughts, and heatwaves.
					</p>
				</div>

				{/* <div className='w-full md:w-1/2 p-4 flex justify-center items-center'>
					<img
						src={
							'https://images.unsplash.com/photo-1624239843776-bc73d46504bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						}
						alt='Info'
						className='rounded-md shadow-lg max-w-md'
					/>
				</div> */}
			</div>

			<div className='w-3/4 flex flex-wrap bg-white p-8 rounded-lg shadow-md my-8 hover:shadow-green-glow'>
				<div className='w-full md:w-1/2 p-4'>
					<h1 className='text-2xl font-bold text-green-500 mb-4'>
						The impact of climate change
					</h1>
					<p className=' text-gray-800'>
						The impact of climate change is not just environmental
						but also social and economic. It affects agriculture by
						changing rainfall patterns, making some regions more
						prone to drought and others to flooding. This
						variability can disrupt food supply, impacting food
						security worldwide. Moreover, rising sea levels threaten
						low-lying areas with increased flooding, potentially
						displacing millions of people.
					</p>
					<br />
					<p className=' text-gray-800'>
						The implications for biodiversity are equally grave.
						Changing climates can disrupt ecosystems, leading to the
						extinction of species that cannot adapt quickly enough.
						For instance, coral reefs, which are highly sensitive to
						water temperature, are experiencing bleaching events at
						an alarming rate.
					</p>
				</div>

				{/* <div className='w-full md:w-1/2 p-4 flex justify-center items-center'>
					<img
						src={
							'https://images.unsplash.com/photo-1599689018459-fcf807a9eceb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						}
						alt='Info'
						className='rounded-md shadow-lg max-w-md'
					/>
				</div> */}
			</div>

			<div className='w-3/4 flex flex-wrap bg-white p-8 rounded-lg shadow-md my-8 hover:shadow-green-glow'>
				<div className='w-full md:w-1/2 p-4 flex justify-center items-center'>
					<img
						src={
							'https://images.unsplash.com/photo-1464039397811-476f652a343b?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						}
						alt='Info'
						className='rounded-md shadow-lg max-w-md'
					/>
				</div>

				<div className='w-full md:w-1/2 p-4'>
					<h1 className='text-2xl font-bold text-green-500 mb-4'>
						Efforts to mitigate climate change
					</h1>
					<p className=' text-gray-800'>
						Efforts to mitigate climate change focus on reducing
						greenhouse gas emissions, transitioning to renewable
						energy sources, and improving energy efficiency.
						Adaptation strategies are also critical, as they involve
						making changes to our infrastructure, agriculture, and
						overall way of life to cope with the changes that are
						already underway. International cooperation is essential
						in this endeavor, as climate change is a global issue
						that transcends national borders.
					</p>
					<br />
					<p className=' text-gray-800'>
						Understanding climate change is crucial for both current
						and future generations. It's not just an environmental
						issue but a complex challenge that intertwines with
						aspects of economics, social justice, and global
						politics. Addressing it requires a concerted effort from
						individuals, communities, businesses, and governments
						worldwide to transition towards more sustainable
						practices and policies.
					</p>
				</div>
			</div>

			<div className='w-3/4 flex flex-wrap bg-white p-8 rounded-lg shadow-md my-8 hover:shadow-green-glow'>
				<div className='w-full md:w-1/2 p-4 flex justify-center items-center'>
					<img
						src={
							'https://images.unsplash.com/photo-1552799446-159ba9523315?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						}
						alt='Info'
						className='rounded-md shadow-lg max-w-md'
					/>
				</div>

				<div className='w-full md:w-1/2 p-4'>
					<h1 className='text-2xl font-bold text-green-500 mb-4'>
						How can an individual help the fight against Climate
						Change?
					</h1>
					<p className=' text-gray-800'>
						Individuals play a crucial role in the global fight
						against climate change through daily lifestyle choices,
						advocacy, and education. One of the most impactful ways
						an individual can contribute is by reducing their carbon
						footprint. This can be achieved by using energy more
						efficiently at home, such as by investing in
						energy-saving appliances, using LED lighting, and
						improving insulation. Additionally, reducing the use of
						private vehicles and opting for public transportation,
						biking, or walking can significantly lower carbon
						emissions.
					</p>
					<br />
					<p className=' text-gray-800'>
						Dietary choices also have a profound effect on the
						environment. Reducing meat consumption, especially beef,
						and embracing a plant-based diet can greatly decrease
						the emission of greenhouse gases. Meat production is one
						of the largest contributors to environmental
						degradation, and a shift towards a more plant-based diet
						can reduce the demand for these resources.
					</p>
				</div>
			</div>

			<div className='w-3/4 flex flex-wrap bg-white p-8 rounded-lg shadow-md my-8 hover:shadow-green-glow'>
				<div className='w-full md:w-1/2 p-4'>
					<h1 className='text-2xl font-bold text-green-500 mb-4'>
						Another effective action
					</h1>
					<p className=' text-gray-800'>
						Another effective action is supporting renewable energy.
						This can involve installing solar panels, if feasible,
						or choosing energy providers that use renewable sources.
						Using renewable energy not only reduces reliance on
						fossil fuels but also supports the development of
						sustainable energy technologies.
					</p>
					<br />
					<p className=' text-gray-800'>
						Waste reduction is another key area. This involves
						minimizing single-use plastics, recycling, and
						composting. Reducing consumption and opting for products
						with less packaging or those made from recycled
						materials can significantly lessen the waste that ends
						up in landfills, where it decomposes and releases
						methane, a potent greenhouse gas.
					</p>
				</div>

				<div className='w-full md:w-1/2 p-4 flex justify-center items-center'>
					<img
						src={
							'https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						}
						alt='Info'
						className='rounded-md shadow-lg max-w-md'
					/>
				</div>
			</div>

			<div className='w-3/4 flex flex-wrap bg-white p-8 rounded-lg shadow-md my-8 hover:shadow-green-glow'>
				<div className='w-full md:w-1/2 p-4'>
					<h1 className='text-2xl font-bold text-green-500 mb-4'>
						Individuals can also contribute
					</h1>
					<p className=' text-gray-800'>
						Individuals can also contribute by staying informed and
						engaging in environmental advocacy. This includes voting
						for policies and leaders committed to combating climate
						change, participating in community initiatives, and
						supporting organizations working towards environmental
						conservation. Educating oneself and others about the
						impacts of climate change and the importance of
						sustainability can foster a more environmentally
						conscious community.
					</p>
					<br />
					<p className=' text-gray-800'>
						Water conservation is another aspect where individuals
						can make a difference. Simple actions like fixing leaks,
						using water-efficient fixtures, and reducing water waste
						can lessen the strain on water resources, which is
						crucial as climate change intensifies water scarcity in
						many regions.
					</p>
				</div>

				<div className='w-full md:w-1/2 p-4 flex justify-center items-center'>
					<img
						src={
							'https://plus.unsplash.com/premium_photo-1697729485006-936105677004?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						}
						alt='Info'
						className='rounded-md shadow-lg max-w-md'
					/>
				</div>
			</div>

			<div className='w-3/4 flex flex-wrap bg-white p-8 rounded-lg shadow-md my-8 hover:shadow-green-glow'>
				<div className='w-full md:w-1/2 p-4'>
					<h1 className='text-2xl font-bold text-green-500 mb-4'>
						Lastly, financial decisions
					</h1>
					<p className=' text-gray-800'>
						Lastly, financial decisions can have a significant
						impact. This includes investing in sustainable companies
						and funds, and choosing to spend money on products and
						services from businesses that prioritize sustainability.
						By redirecting financial resources towards sustainable
						practices, individuals can help drive the market in a
						more environmentally friendly direction.
					</p>
					<br />
					<p className=' text-gray-800'>
						In conclusion, individual actions, when multiplied
						across millions of people, can create a significant
						impact on the fight against climate change. From daily
						lifestyle choices to broader advocacy and education,
						each person has the power to contribute to a more
						sustainable and environmentally conscious world.
					</p>
				</div>

				<div className='w-full md:w-1/2 p-4 flex justify-center items-center'>
					<img
						src={
							'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						}
						alt='Info'
						className='rounded-md shadow-lg max-w-md'
					/>
				</div>
			</div>
		</div>
	)
}

export default Information
