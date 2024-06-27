import axios from "axios";
import swal from "sweetalert";
import { appConstants } from "../../../constants/appConstants";
import Image from "next/image";
import Link from "next/link";

async function fetchTicketData(bookingId) {
	try {
		const res = await axios.post(
			`${appConstants.base_url}v1/booking/ticketing/eTicket?bookingId=${bookingId}`,
			{},
			{
				headers: {
					appVersion: appConstants.app_version,
					platform: appConstants.app_platform,
					country: appConstants.country_name,
				},
			}
		);
		const dt = res.data;

		if (dt.result === "success") {
			return { ticketData: dt.output, error: null };
		} else {
			return { ticketData: null, error: dt.msg };
		}
	} catch (err) {
		console.error("Error fetching ticket details:", err);
		return { ticketData: null, error: err.message };
	}
}

export default async function Page({ params }) {
	const { bookingId } = params;
	const { ticketData, error } = await fetchTicketData(bookingId);
	const isMobile =
		typeof window !== "undefined"
			? window.matchMedia("(max-width: 575px)").matches
			: false;

	if (error) {
		swal({
			text: error,
			timer: 3000,
			icon: "error",
			buttons: false,
		});
	}

	return ticketData ? (
		<section
			className="ptb-30"
			style={{
				backgroundColor: ticketData.chain === "INOX" ? "#DCE2EF" : "#F8F6F6",
			}}>
			<div className="view-container container">
				{!ticketData ? (
					<span>Booking does not exist</span>
				) : (
					<div className="row">
						<div className="col-lg-4 col-md-4 col-sm-12"></div>
						<div
							className={
								isMobile ? "col-md-12 col-sm-12" : "col-lg-4 col-md-4 col-sm-12"
							}>
							<div
								className={
									ticketData.chain === "INOX" ? "e-ticket-inox" : "e-ticket-pvr"
								}>
								<div className="e-ticket-logo">
									<Image
										src="/assets/icons/pvrinox-star-logo.png"
										alt="Brand logo"
										width={120}
										height={25}
									/>
								</div>
								<div className="e-ticket-movie-details">
									<div className="row">
										<div className="col-md-12">
											<div className="movies-name-e-ticket">
												<h2>{ticketData.orderFilmCinema?.theaterName}</h2>
												<p>{ticketData.address}</p>
												<h2>{ticketData.orderFilmCinema?.filmName}</h2>
												<h5>
													{ticketData.orderFilmCinema?.language}{" "}
													{ticketData.orderFilmCinema?.certificate}
												</h5>
											</div>
										</div>
										<div className="col-md-6 col-5">
											<div className="eticket-date-time">
												<h6>Date</h6>
												<h4>
													{ticketData.showTimeStr?.split(", ")[0]},{" "}
													{ticketData.showTimeStr?.split(", ")[1]}
												</h4>
											</div>
										</div>
										<div className="col-md-6 col-7">
											<div className="eticket-date-time right-side">
												<h6>Time</h6>
												<h4>{ticketData.showTimeStr?.split(", ")[2]}</h4>
											</div>
										</div>
										<div className="col-md-6 col-5">
											<div className="eticket-date-time">
												<h6>Screen</h6>
												<h4>{ticketData.orderTicket?.audi}</h4>
											</div>
										</div>
										<div className="col-md-6 col-7">
											<div className="eticket-date-time right-side">
												<h6>Seats</h6>
												<ul>
													{ticketData.orderTicket?.seats
														?.split(",")
														.map((item, idx) => (
															<li key={idx}>{item}</li>
														))}
												</ul>
											</div>
										</div>
										{ticketData.orderFood?.foods.length > 0 && (
											<>
												<div className="col-md-12 col-12">
													<div className="eticket-date-time">
														<h6>Food & Beverages</h6>
														<h4>
															{ticketData.orderFood?.foods.map((item, idx) => (
																<span key={idx}>
																	{item.name} X {item.quantity}
																</span>
															))}
														</h4>
													</div>
												</div>
												<div className="col-md-12 col-12">
													<div className="collectFb">
														<h5>
															<span className="fast-icon">
																<Image
																	src="/assets/icons/fastfood.png"
																	alt=""
																	width={100}
																	height={100}
																/>
															</span>
															Collect F&B Orders From Counter!
														</h5>
													</div>
												</div>
											</>
										)}
										<div className="col-md-12 col-12">
											<div className="qr-details-eticket">
												<div className="row ticket-center">
													<div className="col-md-5 col-5">
														<div className="qr-eticket">
															<Image
																src={ticketData.qr}
																alt=""
																width={100}
																height={100}
															/>
														</div>
													</div>
													<div className="col-md-7 col-7">
														<div className="Ticket-eticket">
															<h6>Ticket ID</h6>
															<h4>{ticketData.bookingId}</h4>
															<h6>Track ID</h6>
															<h4>{ticketData.orderIdEx}</h4>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-12 col-12">
											<div className="offer-eticket-container">
												{ticketData.ph?.length > 0 &&
													ticketData.ph?.map((item, idx) => (
														<div className="offer-img" key={idx}>
															<Link href={item?.redirectUrl} target="_blank">
																<Image
																	src={
																		item?.imageUrl ||
																		(ticketData.chain === "INOX"
																			? "assets/default-images/horizontal-poster-inox.png"
																			: "assets/default-images/horizontal-poster-pvr.svg")
																	}
																	alt=""
																	height={280}
																	width={200}
																/>
															</Link>
														</div>
													))}
											</div>
										</div>
										<div className="col-md-12 col-12">
											<div className="Also-playing">
												<h5>Recommended Movies</h5>
											</div>
											<div className="movies-show-two">
												<div className="row">
													{ticketData.recomendMovies
														?.slice(0, 4)
														.map((item, idx) => {
															const defaultImgUrl =
																"assets/default-images/vertical-poster-inox.png";
															const imageUrl = item.miv || defaultImgUrl;
															return (
																<div className="col-6 col-md-6" key={idx}>
																	<div className="poster-show-recommended">
																		<Link
																			href={
																				item.surl ||
																				(ticketData.chain === "INOX"
																					? `https://www.inoxmovies.com/moviesessions/${item.n?.replace(
																							/\s/g,
																							"-"
																					  )}/${item.id}`
																					: `https://www.pvrcinemas.com/moviesessions/${item.n?.replace(
																							/\s/g,
																							"-"
																					  )}/${item.id}`)
																			}
																			target="_blank">
																			<Image
																				src={imageUrl}
																				alt="poster"
																				width={200}
																				height={281}
																			/>
																		</Link>
																	</div>
																</div>
															);
														})}
												</div>
											</div>
										</div>
									</div>
									<div className="poster-movies p-3">
										<Image
											src={
												ticketData.orderFilmCinema?.posterVert ||
												(ticketData.chain === "INOX"
													? "/assets/default-images/vertical-poster-inox.png"
													: "/assets/default-images/vertical-poster-pvr.svg")
											}
											alt="vertical-poster"
											width={200}
											height={281}
										/>
									</div>
									<div className="social-link">
										<ul>
											<li>
												<Link
													href={
														ticketData.chain === "INOX"
															? "https://www.facebook.com/INOXLEISURE"
															: "https://www.facebook.com/moviesatpvr"
													}
													target="_blank">
													<Image
														src="/assets/icons/facebook.png"
														alt="Brand Image"
														width={20}
														height={20}
													/>
												</Link>
											</li>
											<li>
												<Link
													href={
														ticketData.chain === "INOX"
															? "https://www.instagram.com/inoxmovies"
															: "https://www.instagram.com/pvrcinemas_official"
													}
													target="_blank">
													<Image
														src="/assets/icons/instagram.png"
														alt="Brand Image"
														width={20}
														height={20}
													/>
												</Link>
											</li>
											<li>
												<Link
													href={
														ticketData.chain === "INOX"
															? "https://www.youtube.com/user/moviesatINOX"
															: "https://www.youtube.com/user/PVRChannel"
													}
													target="_blank">
													<Image
														src="/assets/icons/youtube.png"
														alt="Brand Image"
														width={20}
														height={20}
													/>
												</Link>
											</li>
											<li>
												<Link
													href={
														ticketData.chain === "INOX"
															? "https://twitter.com/INOXMovies"
															: "https://twitter.com/_PVRCinemas"
													}
													target="_blank">
													<Image
														src="/assets/icons/twitter.png"
														alt="Brand Image"
														width={20}
														height={20}
													/>
												</Link>
											</li>
											<li>
												<Link
													href={
														ticketData.chain === "INOX"
															? "https://www.linkedin.com/company/inox-leisure-ltd/?originalSubdomain=in"
															: "https://www.linkedin.com/company/pvr-limited/"
													}
													target="_blank">
													<Image
														src="/assets/icons/linkedin.png"
														alt="Brand Image"
														width={20}
														height={20}
													/>
												</Link>
											</li>
										</ul>
									</div>
									<div className="Terms-eticket">
										<ul>
											<li>
												<Link
													href={
														ticketData.chain === "INOX"
															? "https://www.inoxmovies.com/terms-conditions/booking"
															: "https://www.pvrcinemas.com/terms-conditions/booking"
													}
													target="_blank">
													Terms & Conditions
												</Link>
											</li>
											<li>
												<Link
													href={
														ticketData.chain === "INOX"
															? "https://www.inoxmovies.com/faq"
															: "https://www.pvrcinemas.com/faq"
													}
													target="_blank">
													FAQs
												</Link>
											</li>
											<li>
												<Link
													href={
														ticketData.chain === "INOX"
															? "https://www.inoxmovies.com/feedback"
															: "https://www.pvrcinemas.com/feedback"
													}
													target="_blank">
													Feedback/Help
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-12"></div>
						</div>
					</div>
				)}
			</div>
		</section>
	) : null;
}
