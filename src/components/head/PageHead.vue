<!-- @format -->

<template>
	<div class="pagehead" :class="page">
		<div class="container">
			<div class="pagehead_main">
				<div class="pagehead__content">
					<h1>{{ data.title }}</h1>
					<div class="pagehead__txt">
						{{ data.txt }}
					</div>
					<div class="pagehead_btn">
						<DefaultBtn
							v-if="data.btn"
							name="Арендовать"
							type="secondary"
							color="black"
							size="large"
						/>
					</div>
				</div>
				<div class="pagehead__img">
					<img :src="data.img" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from "vue";
	import DefaultBtn from "../ui/DefaultBtn.vue";

	defineProps<{
		data: any;
		page?: string;
	}>();
</script>

<style scoped lang="scss">
	.pagehead_main {
		@include flex-start;
		padding-top: calc($header + 6.9rem);
		margin-bottom: 2.7rem;

		h1 {
			line-height: 120%;
			font-size: 5rem;
			margin-bottom: 4.7rem;
			margin-right: -15rem;
		}
		.pagehead__txt {
			max-width: 70.6rem;
		}
	}

	.pagehead__img {
		max-width: 85rem;
	}

	.pagehead_btn {
		margin-top: 4.3rem;
		display: inline-flex;
	}

	.rent {
		h1 {
			font-size: 6.5rem;
			line-height: 120%;
		}
		.pagehead_main {
			padding-left: 14.4rem;
		}
	}
</style>
